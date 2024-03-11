export const getMinDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 90);
  return currentDate;
};

export const getMaxDate = () => {
  const currentDate = new Date();
  return currentDate;
};

export const decrementDate = (date: Date, num: number) => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() - num);
  return currentDate;
};

export const formatDate = (date: Date) => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
