import {Pipe, PipeTransform} from "@angular/core";
import {IssueModel} from "../models/IssueModel";
import {ConnectedObjectRequestModel} from "../models/ConnectedObjectRequestModel";

@Pipe({
    name: 'userPipe',
    pure: false
})
export class UserPipe implements PipeTransform {

    transform(items: ConnectedObjectRequestModel[], firstname:string) : any{

        if (items == null) {
            return null;
        }

        return items.filter((item) => item.author != undefined && item.author.firstname == firstname);
    }
}