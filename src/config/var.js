export const formItems = [
    { label: "Vardas", field: "firstName" },
    { label: "Pavardė", field: "lastName" },
    { label: "Adresas", field: "adress" },
    { label: "Namasdsdgsdgsdfsdfdsfs dsdfsdfsdfasdas dasdas", field: "haus" },
    { label: "Namasdsdgsdgsd fasdas ", field: "haus2" },
    { label: "Namasdsdgsdgsd fasdas ", field: "haus3" },
    { label: "Tel", field: "phone" },
  ];
 export const peopleTitleLine = [
    "Nr",
    ...formItems.map((item) => item.label),
    "Veiksmai",
  ];

 export const initialFormData = formItems.reduce((acc, item) => {
    return { ...acc, [item.field]: "" };
  }, {});
export const borderStyle = "border-black border"