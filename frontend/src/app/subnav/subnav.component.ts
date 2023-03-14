import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})

export class SubnavComponent {

  removeClass(id: string, route: string) {
    this.routeComponent(route);

    const myCollection: HTMLCollectionOf<Element> = document.getElementsByClassName('subnav-item');

    for (let i = 0; i < myCollection.length; i++) {
      // @ts-ignore
      const element: Element = myCollection.item(i);
      // Fügen Sie hier den Code ein, der auf jedes Element in der Sammlung angewendet werden soll.
      element.classList.remove("subnav-item-active");
      console.log(element.tagName);
    }
    // @ts-ignore
    const newActive: Element = myCollection.item(id);
    newActive.classList.add("subnav-item-active");
  }

  routeComponent(route: string) {
    document.location.href = route;
  }

}
