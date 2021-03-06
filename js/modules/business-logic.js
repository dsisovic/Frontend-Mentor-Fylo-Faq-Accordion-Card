import accordionData from './accordion-data.js';
import ui from './ui.js';
class BusinessLogic {

    constructor() { }

    initializeAPP() {
        const accordionContent = this.getAccordionContent();
        const cardElement = ui.getElements('.card', false);
        const headerElement = cardElement.children[0];
        const newDiv = ui.createNewElement('div');

        ui.createAttribute(newDiv, 'data-main', 'main');
        ui.createAttribute(newDiv, 'class', 'card__content');
        newDiv.innerHTML = accordionContent;

        cardElement.insertBefore(newDiv, headerElement.nextElementSibling);
        this.setClickEventListener();
    }

    getAccordionContent() {
        const mainAccordionContent = accordionData.getAccordionContent()
            .map(accordionItem => {
                const { headerName, accordionContent, id } = accordionItem;
                return `
                    <div class="card__accordion">
                        <div class="card__accordion-header" data-id="${id}">
                            <p>${headerName}</p>
                            <img src="./images/icon-arrow-down.svg" alt="arrow" class="card__accordion-icon">
                        </div>
                        <div class="card__accordion-content card__accordion-content--hidden">
                            <p>${accordionContent}</p>
                        </div>
                    </div>`;
            });

        return ['<h1>FAQ</h1>', ...mainAccordionContent].join('');
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

            if (activeHeaderState) {
                headerElement.children[1].style.transform = 'rotate(180deg)';
                headerElement.nextElementSibling.classList.remove('card__accordion-content--hidden');
            } else {
                headerElement.children[1].style.transform = 'rotate(0deg)';
                headerElement.nextElementSibling.classList.add('card__accordion-content--hidden');
            }

        }
    }
}

const businessLogic = new BusinessLogic();

export { businessLogic };
