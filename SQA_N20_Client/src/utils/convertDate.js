export const convertDate = (time) => {
    const date = new Date(time);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const res = `${day}/${month}/${year}`;
    return res;
};
