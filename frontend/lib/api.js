// lib/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchWithTimeout(url, options = {}) {
  const timeout = 8000; // 8 seconds
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function fetchPrograms() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/programs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch programs');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function fetchBranches() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/branches`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch branches');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function fetchReviews() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/reviews`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function fetchFAQs() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch faqs');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function fetchPricingPlans() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/pricing`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch pricing plans');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function fetchEvents() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/events`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch events');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function fetchBranchBySlug(slug) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/branches/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}
