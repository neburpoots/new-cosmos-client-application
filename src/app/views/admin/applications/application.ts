import { Application, ApplicationsOrderBy } from "../../../../generated/graphql";
import { TableField } from "../../../models/utils/tableField";
import { TableHead } from "../../../models/utils/tableHead";

export const applicationTableHeaders: TableHead<ApplicationsOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: ApplicationsOrderBy.NameAsc, desc: ApplicationsOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: ApplicationsOrderBy.CreatedAsc, desc: ApplicationsOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: ApplicationsOrderBy.UserByOwnerIdInitialsAsc, desc: ApplicationsOrderBy.UserByOwnerIdInitialsDesc },
  ]

export const mapApplicationTableData = (applications: Application[]): any[] => {

    return applications.map((application: Application) => {
      return {
        id: { url: null, value: application.id } as TableField,
        name: { url: null, value: application?.name } as TableField,
        created: { url: null, value: application?.created } as TableField,
        initials: { url: null, value: application?.userByOwnerId?.initials } as TableField,
      };
    });
  }
