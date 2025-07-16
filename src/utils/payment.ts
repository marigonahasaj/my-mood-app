export const checkIfPaid = async (email: string): Promise<boolean> => {
    const res = await fetch(`http://localhost:8000/has-paid?email=${email}`);
    const { paid } = await res.json();
    return paid;
};
