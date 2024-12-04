import BreadcrumbCom from "../BreadcrumbCom";

export default function PageTitle({ title, breadcrumb = [] }) {
  return (
    <div className="page-title-wrapperw-full h-[173px] py-1">
      <div className="container-x mx-auto">
        <div className="mb-2">
          <BreadcrumbCom paths={breadcrumb} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-qblack">{title}</h1>
        </div>
      </div>
    </div>
  );
}
