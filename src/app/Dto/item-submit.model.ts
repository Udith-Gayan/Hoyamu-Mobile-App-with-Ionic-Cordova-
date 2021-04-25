import { ItemCategoryType } from './../Common_Components/enums/ItemCategoryEnum';
import { ContactDto } from './contact.model';
export class ItemSubmitDto {
    public item: Item;
    public contact: ContactDto;
}

export class Item {
    public placeFound?: string;
    public dateFound?: Date;
    public description?: string;
    public imageUrl?: string;
    public imageNameKey?: string; // used to read the native storage to get the image data
    public mainCategoryType: ItemCategoryType;
}

