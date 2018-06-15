import {Pipe, PipeTransform} from "@angular/core";
import {IssueModel} from "../../../../shared/models/IssueModel";

@Pipe({
    name: 'incidentTypePipe',
    pure: false
})
export class Incidents_catPipe implements PipeTransform {

    transform(items: IssueModel[], idUser: number, type: boolean) {

        if (items == null) {
            return null;
        }
        if (type) {
            // if (idUser == 0) {
            //     return items.filter((item) => item.thirdPartyId == null);
            // }
            // return items.filter((item) => item.thirdPartyId != null && item.thirdPartyId == idUser);
            return items.filter((item) => item.assignMember != null && item.assignMember.length <= 0);
        }
        return items.filter((item) => item.authorId != null && item.authorId == idUser);
    }
}