'use server';

import { BASE_URL } from './constant';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function uploadImage(image: File): Promise<string> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) {
    throw new Error('Access token is missing');
  }
  const imageFormData = new FormData();
  imageFormData.append('image', image);
  const response = await fetch(`${BASE_URL}/activities/image`, {
    method: 'POST',
    body: imageFormData,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload image: ${errorText}`);
  }

  const data = await response.json();
  return data.activityImageUrl;
}

export async function create(prevState: any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    // 배너 이미지 업로드 및 URL 저장
    const bannerImage = formData.get('bannerImage') as File;
    let bannerImageUrl = '';
    if (bannerImage && bannerImage.size > 0) {
      bannerImageUrl = await uploadImage(bannerImage);
    }

    // 서브 이미지 업로드 및 URL 저장
    const subImages = formData.getAll('subImages') as File[];
    const subImageUrls = await Promise.all(
      subImages
        .slice(0, 3)
        .map((file) => (file.size > 0 ? uploadImage(file) : null))
    ).then((urls) => urls.filter((url) => url !== null));

    // 스케줄 처리
    const schedules = JSON.parse(formData.get('schedules') as string);

    // JSON 데이터 생성
    const requestData = {
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      address: formData.get('address'),
      price: Number(formData.get('price')),
      schedules: schedules,
      bannerImageUrl: bannerImageUrl,
      subImageUrls: subImageUrls,
    };

    // 활동 생성 API 요청
    const response = await fetch(`${BASE_URL}/activities`, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create activity: ${errorText}`);
    }

    const data = await response.json();
    revalidatePath('/dashboard');

    return data;
  } catch (error) {
    console.error('Error creating activity:', error);
  }
}
