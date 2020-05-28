import "./default.scss";
import "./index.scss";

import React, { PureComponent } from "react";
import Article from "./components/article";
import modifySelectionDecorate from "./selection-operator/modify-selection-decorate";
import Paragraph from "./components/paragraph";
import Media from "./components/media";
import ComponentType from "./const/component-type";
import InlineImage from "./components/inline-image";
import input from "./selection-operator/input";
import mount from "./util/mount";
import updateComponent from "./selection-operator/update-component";
import insertBlock from "./selection-operator/insert-block";
import Title from "./components/title";
import List, { ListItem } from "./components/list";
import modifyComponentDecorate from "./selection-operator/modify-component-decorate";

let article = new Article();
article.addChildren(new Title("h1", "A Song of Ice and Fire"));
article.addChildren(new Title("h2", "A Song of Ice and Fire"));
article.addChildren(new Title("h3", "A Song of Ice and Fire"));
article.addChildren(new Title("h4", "A Song of Ice and Fire"));
article.addChildren(new Title("h5", "A Song of Ice and Fire"));
article.addChildren(new Title("h6", "A Song of Ice and Fire"));
article.addChildren(
  new Media(ComponentType.image, "https://blogcdn.acohome.cn/demo-draft-1.jpg")
);
article.addChildren(
  new Paragraph(
    "Ser Waymar Royce was the youngest son of an ancient house with too many heirs. He was ahandsome youth of eighteen, grey-eyed and graceful and slender as a knife. Mounted on his hugeblack destrier, the knight towered above Will and Gared on their smaller garrons. He wore blackleather boots, black woolen pants, black moleskin gloves, and a fine supple coat of gleaming blackringmail over layers of black wool and boiled leather. Ser Waymar had been a Sworn Brother of theNight’s Watch for less than half a year, but no one could say he had not prepared for his vocation. Atleast insofar as his wardrobe was concerned."
  )
);
article.addChildren(
  new Paragraph(
    "His cloak was his crowning glory; sable, thick and black and soft as sin. “Bet he killed them allhimself, he did,” Gared told the barracks over wine, “twisted their little heads off, our mightywarrior.” They had all shared the laugh."
  )
);
article.addChildren(
  new Paragraph(
    "It is hard to take orders from a man you laughed at in your cups, Will reflected as he sat shiveringatop his garron. Gared must have felt the same."
  )
);
let paragraph = new Paragraph("happy!!! ");
paragraph.addChildren(
  new InlineImage(
    "http://cdn.acohome.cn/1.png?imageMogr2/auto-orient/thumbnail/x20"
  )
);
paragraph.addText(" happy!!!");
paragraph.addIntoParent(article);

let list = new List("ul");
list.addChildren(new ListItem("part1"));
list.addChildren(new ListItem("part2"));
list.addChildren(new ListItem("part3"));
list.addChildren(new ListItem("part4"));
list.addIntoParent(article);

let list2 = new List("ol");
list2.addChildren(new ListItem("part1"));
list2.addChildren(new ListItem("part2"));
list2.addChildren(new ListItem("part3"));
list2.addChildren(new ListItem("part4"));
list2.addIntoParent(article);

export default class Draft extends PureComponent {
  root: HTMLElement | null = null;

  componentDidMount() {
    if (this.root) {
      mount(this.root, article);
    }
  }

  showArticle = () => {
    updateComponent(article);
  };

  bold = () => {
    modifySelectionDecorate("fontWeight", "bold");
  };
  delete = () => {
    modifySelectionDecorate("textDecoration", "line-through");
  };
  underline = () => {
    modifySelectionDecorate("textDecoration", "underline");
  };
  itailc = () => {
    modifySelectionDecorate("fontStyle", "italic");
  };
  red = () => {
    modifySelectionDecorate("color", "red");
  };
  clearStyle = () => {
    modifySelectionDecorate("clear", "style");
  };

  insertInlineImage = () => {
    let index = Math.floor(Math.random() * 56 + 1);
    input(
      new InlineImage(
        `http://cdn.acohome.cn/${index}.png?imageMogr2/auto-orient/thumbnail/x20`
      )
    );
  };
  insertImage = () => {
    let index = Math.random() > 0.5 ? 1 : 3;
    insertBlock(
      new Media(
        ComponentType.image,
        `https://blogcdn.acohome.cn/demo-draft-${index}.jpg`
      )
    );
  };
  modifyType = (tag: string) => {
    modifyComponentDecorate(undefined, { tag });
  };
  modifyStyle = (name: string, value: string) => {
    modifyComponentDecorate({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="stick">
          <button onClick={this.showArticle}>show article</button>
          <div>
            <span>控制段落内容样式：</span>
            <button onClick={this.bold}>bold</button>
            <button onClick={this.delete}>delete</button>
            <button onClick={this.underline}>underline</button>
            <button onClick={this.itailc}>itailc</button>
            <button onClick={this.red}>red</button>
            <button onClick={this.clearStyle}>clearStyle</button>
          </div>
          <div>
            <span>添加内联的块：</span>
            <button onClick={this.insertInlineImage}>insertInlineImage</button>
          </div>
          <div>
            <span>添加块级元素：</span>
            <button onClick={this.insertImage}>insertImage</button>
          </div>
          <div>
            <span>切换块级类型：</span>
            <button onClick={() => this.modifyType("h1")}>h1</button>
            <button onClick={() => this.modifyType("h2")}>h2</button>
            <button onClick={() => this.modifyType("h3")}>h3</button>
            <button onClick={() => this.modifyType("h4")}>h4</button>
            <button onClick={() => this.modifyType("h5")}>h5</button>
            <button onClick={() => this.modifyType("h6")}>h6</button>
            <button onClick={() => this.modifyType("")}>normal</button>
          </div>
          <div>
            <span>修改块级样式：</span>
            <button onClick={() => this.modifyStyle("padding", "10px")}>
              padding10
            </button>
            <button onClick={() => this.modifyStyle("margin", "10px")}>
              margin10
            </button>
            <button onClick={() => this.modifyStyle("border", "1px solid")}>
              border
            </button>
            <button onClick={() => this.modifyStyle("backgroundColor", "grey")}>
              backgroundGrey
            </button>
            <button onClick={() => this.modifyStyle("color", "white")}>
              textWhite
            </button>
          </div>
        </div>
        <div className="draft-wrap" ref={(el) => (this.root = el)}></div>
      </div>
    );
  }
}