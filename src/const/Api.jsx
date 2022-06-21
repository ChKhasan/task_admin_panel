export const TOKEN = "auth_token";
export const API_URL = "https://coursesnodejs.herokuapp.com/employee";
export const IMG_SRC = "https://coursesnodejs.herokuapp.com";
export const AUTHOR = "/author";
export const COURSE = "/course";
export const BOOK = "/book";
export const CATEGORY = "/category";
export const EMPLOYEE_UPDATE = "/update";
export const EMPLOYEE_CREATE = "/create";
export const ROLE = "/role";
export const ROLE_CATEGORY = [
  {
    name: "employee",
    label: "employee",
  },
  {
    name: "employeeCreate",
    label: "employeeCreate",
  },
  {
    name: "employeeUpdate",
    label: "employeeUpdate",
  },
  {
    name: "employeeDelete",
    label: "employeeDelete",
  } 
  ,{
    name: "role",
    label: "role",
  },
  {
    name: "roleCreate",
    label: "roleCreate",
  },
  {
    name: "roleUpdate",
    label: "roleUpdate",
  },
  {
    name: "roleDelete",
    label: "roleDelete",
  },
  {
    name: "book",
    label: "book",
  },
  {
    name: "bookCreate",
    label: "bookCreate",
  },
  {
    name: "bookUpdate",
    label: "bookUpdate",
  },
  {
    name: "bookDelete",
    label: "bookDelete",
  },
  {
    name: "author",
    label: "author",
  },
  {
    name: "authorCreate",
    label: "authorCreate",
  },
  {
    name: "authorUpdate",
    label: "authorUpdate",
  },
  {
    name: "authorDelete",
    label: "authorDelete",
  },
  {
    name: "genre",
    label: "genre",
  },
  {
    name: "genreCreate",
    label: "genreCreate",
  },
  {
    name: "genreUpdate",
    label: "genreUpdate",
  },
  {
    name: "genreDelete",
    label: "genreDelete",
  },
  {
    name: "user",
    label: "user",
  },
  {
    name: "userCreate",
    label: "userCreate",
  },
  {
    name: "userUpdate",
    label: "userUpdate",
  },
  {
    name: "userDelete",
    label: "userDelete",
  },
  {
    name: "course",
    label: "course",
  },
  {
    name: "courseCreate",
    label: "courseCreate",
  },
  {
    name: "courseUpdate",
    label: "courseUpdate",
  },
  {
    name: "courseDelete",
    label: "courseDelete",
  },
 
  
];
export const experiences_columns = [
  {
    title: "Work Name",
    dataIndex: "work_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Company Name",
    dataIndex: "company_name",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
  },
  {
    title: "End Date",
    dataIndex: "end_date",
  },
];

export const columns_skills = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Percent",
    dataIndex: "percent",
  },
];
