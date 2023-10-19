export const calculateBusinessDays = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const diff = end - start;
  const days = diff / (1000 * 60 * 60 * 24);
  let businessDays = 0;
  for (let i = 0; i < days; i++) {
    const current = new Date(start + i * (1000 * 60 * 60 * 24));
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      businessDays++;
    }
  }
  return businessDays;
};
