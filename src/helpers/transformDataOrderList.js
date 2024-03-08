export const transformDataOrderList = (arr = []) => {
  const newArr = [];
  arr?.map((item) => {
    newArr.push(`${item?.prod} - ${item?.quantity} ${item?.ves}`);
  });
  return newArr;
};
