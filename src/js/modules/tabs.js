function tabs(itemsSelector, parentItemSelector, tabcontentsSelector, itemsActiveSelector, tabcontentsActiveSelector) {
    const items = document.querySelectorAll(itemsSelector),
        parentItem = document.querySelector(parentItemSelector),
        tabcontents = document.querySelectorAll(tabcontentsSelector);


    parentItem.addEventListener('click', (e) => {

        items.forEach((item, num) => {

            if(e.target == item) {

                removeClassActiveAndAnimation(items, itemsActiveSelector);
                item.classList.add(itemsActiveSelector);

                removeClassActiveAndAnimation(tabcontents, tabcontentsActiveSelector, 'fade');
                tabcontents[num].classList.add(tabcontentsActiveSelector, 'fade');
            }
        });
    });

    function removeClassActiveAndAnimation(Element, deleteClass, animation) {
        Element.forEach((i) => {
            i.classList.remove(deleteClass);
            i.classList.remove(animation);
        });
    }
}

export default tabs;