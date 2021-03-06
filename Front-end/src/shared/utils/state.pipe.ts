import {Pipe, PipeTransform} from "@angular/core";
import {IssueModel} from "../models/IssueModel";
import {ConnectedObjectRequestModel} from "../models/ConnectedObjectRequestModel";

@Pipe({
    name: 'statePipe',
    pure: false
})
export class StatePipe implements PipeTransform {

    transform(items: ConnectedObjectRequestModel[], value:number) : any{

        if (items == null) {
            return null;
        }

        return items.filter((item) => item.state != undefined && item.state.value == value);
    }
}