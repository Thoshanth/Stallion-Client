// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchPrograms() {
  try {
    const res = await fetch(`${API_URL}/programs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch programs');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchBranches() {
  try {
    const res = await fetch(`${API_URL}/branches`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch branches');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchReviews() {
  try {
    const res = await fetch(`${API_URL}/reviews`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchFAQs() {
  try {
    const res = await fetch(`${API_URL}/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch faqs');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchPricingPlans() {
  try {
    const res = await fetch(`${API_URL}/pricing`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch pricing plans');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
