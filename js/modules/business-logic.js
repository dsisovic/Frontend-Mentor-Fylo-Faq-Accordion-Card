import accordionData from './accordion-data.js';
import ui from './ui.js';

export class BusinessLogic {

    constructor() { }

    initializeAPP() {
        const accordionContent = this.getAccordionContent();
        const cardContentElement = ui.getElements('.card__content', false);
        const faqElement = cardContentElement.children[0];

        const newDiv = ui.createNewElement('div');
        ui.createAttribute(newDiv, 'data-main', 'main');
        newDiv.innerHTML = accordionContent;

        cardContentElement.insertBefore(newDiv, faqElement.nextSibling);
        this.setClickEventListener();
    }

    getAccordionContent() {
        return accordionData.getAccordionContent()
            .map(accordionItem => {
                const { headerName, accordionContent, id } = accordionItem;
                return `
                    <div class="card__accordion">
                        <div class="card__accordion-header" data-id="${id}">
                            <p>${headerName}</p>
                            <img src="./images/icon-arrow-down.svg" alt="arrow">
                        </div>
                        <div class="card__accordion-content card__accordion-content--hidden">
                            <p>${accordionContent}</p>
                        </div>
                    </div>`;
            })
            .join('');
    }

    setClickEventListener() {
        const mainDiv = ui.getElements(`[data-main]`, false);
        mainDiv.addEventListener('click', this.handleClickEventLogic.bind(this));
    }

    hasClass(element, cssClass) {
        return (ui.getAttribute(element, 'class') || '').includes(cssClass);
    }

    handleClickEventLogic(event) {
        event.stopPropagation();

        const eventTarget = event.target;
        const targetHasHeaderClass = this.hasClass(eventTarget, 'card__accordion-header');
        const parentHasHeaderClass = this.hasClass(eventTarget.parentElement, 'card__accordion-header');

        if (targetHasHeaderClass || parentHasHeaderClass) {
            const datasetId = targetHasHeaderClass ? eventTarget.dataset.id : eventTarget.parentElement.dataset.id

            const headerElement = ui.getElements(`[data-id='${datasetId}']`, false);
            headerElement.classList.toggle('card__accordion-header--active');

            const activeHeaderState = this.hasClass(headerElement, 'active');
            const classFunction = activeHeaderState ? 'remove' : 'add';
            const rotateStyle = activeHeaderState ? 'rotate(180deg)' : 'rotate(0deg)';

            headerElement.children[1].style.transform = rotateStyle;
            headerElement.nextSibling.nextSibling.classList[classFunction]('card__accordion-content--hidden');
        }
    }
}

const businessLogic = new BusinessLogic();

export { businessLogic };
