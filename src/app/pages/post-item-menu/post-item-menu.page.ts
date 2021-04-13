import { Component, OnInit } from '@angular/core';
import { PageRouterService } from 'src/app/services/page-router.service';
import { IItemRows } from 'src/app/interfaces/rowItem';

@Component({
  selector: 'app-post-item-menu',
  templateUrl: './post-item-menu.page.html',
  styleUrls: ['./post-item-menu.page.scss'],
})
export class PostItemMenuPage implements OnInit {

  constructor(private pageRouter: PageRouterService) { }

  rowList: IItemRows[] = [
    { items: [
      {imgUrl: 'assets\\item_icons\\id.png',
       routePath: 'post-item-menu/nic',
       text: 'NIC',
       isShow: true,
       tags: 'nic national identity card ජාතික හැඳුනුම්පත් හැඳුනුම්පත'
      },
      {imgUrl: 'assets\\item_icons\\licence.png',
       routePath: 'post-item-menu/nic',
       text: 'Driving Licences',
       isShow: true,
       tags: 'driving licences රියදුරු බලපත්‍රය'
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\passport3.png',
       routePath: 'post-item-menu/nic',
       text: 'Passport',
       isShow: true,
       tags: 'passports විදේශ ගමන් බලපත්‍රය ගුවන්'
      },
      {imgUrl: 'assets\\item_icons\\nic.png',
       routePath: 'post-item-menu/nic',
       text: 'Other ID',
       isShow: true,
       tags: 'other id identity වෙනත් හැඳුනුම්පත්'
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\paper.png',
       routePath: 'post-item-menu/nic',
       text: 'Papers & Documents',
       isShow: true,
       tags: 'papers documents notes පත්‍රය නෝට්ස් ලිපිද්‍රව්‍ය ලියකියවිලි'
      },
      {imgUrl: 'assets\\item_icons\\bag.png',
       routePath: 'post-item-menu/bag',
       text: 'Bag',
       isShow: true,
       tags: 'bags බෑග් බෑගය'
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\wallet.png',
       routePath: 'post-item-menu/nic',
       text: 'Wallet',
       isShow: true,
       tags: 'wallets මුදල් පසුම්බිය purses පර්ස්'
      },
      {imgUrl: 'assets\\item_icons\\creditcard.png',
       routePath: 'post-item-menu/nic',
       text: 'Bank Cards',
       isShow: true,
       tags: 'bank cards credit debit atm බැංකු කාඩ්'
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\mobile.png',
       routePath: 'post-item-menu/nic',
       text: 'Mobile Phone',
       isShow: true,
       tags: 'mobile phones hand ජංගම දුරකථනය දුරකතනය'
      },
      {imgUrl: 'assets\\item_icons\\laptop.png',
       routePath: 'post-item-menu/nic',
       text: 'Laptops & Related Devices',
       isShow: true,
       tags: 'laptops chargers charge keyboards mouses ipad palmtops pads ලැප්ටොප්ස් මවුස් කිබෝඩ් කීබෝඩ් කිබොඩ් චාජර්'
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\watch.png',
       routePath: 'post-item-menu/nic',
       text: 'Watches',
       isShow: true,
       tags: 'watches hand watches clocks අත් ඔරලෝසු ඔරලොසු'
      },
      {imgUrl: 'assets\\item_icons\\electronic.png',
       routePath: 'post-item-menu/nic',
       text: 'Electrical & Electronic Appliances',
       isShow: true,
       tags: 'electrical electronic speakers machine chargers ear headsets විදුලි උපාංගය ස්පීකර්ස් ස්පිකර්ස් මැෂින් පෝන් චාජර්ස් '
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\jewelry.png',
       routePath: 'post-item-menu/nic',
       text: 'Jewellery',
       isShow: true,
       tags: 'jewellery rings ear gold silver bangles jevelleries ආභරන ආභරණ මාල වලලු වළලු වලල්ල වළල්ල කරාබු මුද්ද මුදු රත්තරන් රිදී රත්‍රං'
      },
      {imgUrl: 'assets\\item_icons\\garments.png',
       routePath: 'post-item-menu/nic',
       text: 'Garments',
       isShow: true,
       tags: 'clothes garments shirts tshirts skirts under wears trousers pants shorts briefs thongs boxers socks ඇඳුම් ඇදුම් ඇදුම ඇඳුම රෙද්ද රෙදි ගවුම් කලිසම කලිසම් සායවල් ජොක්කු ජොකා බිකිනි යට බැනියම් ෂර්ට්ස් චිත්ත චීත්ත'
      }
    ]},
    { items: [
      {imgUrl: 'assets\\item_icons\\money.png',
       routePath: 'post-item-menu/nic',
       text: 'Cash',
       isShow: true,
       tags: 'cash money මුදල් සල්ලි'
      },
      {imgUrl: 'assets\\item_icons\\other.png',
       routePath: 'post-item-menu/nic',
       text: 'Other',
       isShow: true,
       tags: 'others shoes sandals footwear water  bottles  වෙනත් අනෙකුත්'
      }
    ]}
  ];

  showSearchBar = false;

  ngOnInit() {
  }

  onItemClick(path: string) {
    alert(path);
    this.pageRouter.goTo(path);
  }

  filterItem(text: any){
    const searchWord: string = text.trim().toLowerCase();
    if (searchWord === ''){
      this.rowList.forEach(row => {
        row.items.forEach(item => {
          item.isShow = true;
      });
    });
    } else {
      this.rowList.forEach(row => {
        row.items.forEach(item => {
          if (item.tags.includes(searchWord)) {
            item.isShow = true;
          } else {
            item.isShow = false;
          }
        });
      });
    }
  }

  onSearchBarVisible(val: boolean){
    this.showSearchBar = val;
  }


}
