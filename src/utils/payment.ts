// In-memory store for paid users (replace with DB in production)
export const paid_users = new Set<string>();

export const checkIfPaid = async (email: string): Promise<boolean> => {
    const res = await fetch(`/api/has-paid?email=${email}`);
    const { paid } = await res.json();
    return paid;
};
