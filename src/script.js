const MODAL_ID = 'modal';
const MODAL_TEXTAREA_ID = 'modal-textarea';
const ITEM_LIST_ID = 'list';

const modal = document.getElementById(MODAL_ID);
let itemList = [];

initApp();

function initApp() {
    loadItemList();
    renderItemList();
    initModal();
}

function loadItemList() {
    const list = localStorage.getItem(ITEM_LIST_ID);
    if (!list) return;

    itemList = JSON.parse(list);
}

function saveItemList() {
    localStorage.setItem('list', JSON.stringify(itemList));
}

function hideModal() {
    if (!modal) return;

    modal.classList.remove('visible');
}

function showModal(title, contentTemplate) {
    if (!modal) return;

    modal.innerHTML = `
        <div class="modal-inner">
            <div class="modal-header">
                <div class="modal-title">${title}</div> 
                <div class="modal-close-btn" onclick="handleCloseModalClick()">&#215;</div>
            </div>
            ${contentTemplate}
        </div>
    `;
    modal.classList.add('visible');
}

function initModal() {
    if (!modal) return;

    const handleModalClick = (event) => {
        const elem = document.getElementById('modal');
        if (!elem || (elem && !elem.classList.contains('visible'))) return;

        if (event?.target?.classList.contains('modal') || event?.target?.classList.contains('close-icon')) {
            hideModal();
        }
    }

    modal.addEventListener('click', handleModalClick);
}

function handleClearAllClick() {
    const modalTitle = 'Подтверждение'
    const template = `
        <div class="modal-text">Очистить все?</div>
        <div class="modal-buttons">
            <div class="modal-btn secondary" onclick="hideModal()">Отмена</div>
            <div class="modal-btn primary" onclick="acceptClearAllClick()">Ок</div>
        </div>
    `;
    
    showModal(modalTitle, template);
}

function acceptClearAllClick() {
    clearAll();
    hideModal();
}

function clearAll() {
    itemList = [];

    renderItemList();
    saveItemList();
}

function handleCloseModalClick() {
    hideModal();
}

const handleItemClick = (id) => {
    const elem = document.getElementById(`item_${id}`);
    if (!elem) return;

    elem.classList.toggle('selected');

    itemList = itemList.map(item => {
        if (item.id === id) {
            return {
                id,
                value: item.value,
                checked: !item.checked
            }
        }
        return item;
    });
    saveItemList();
}

function handleAddItemClick() {
    const modalTitle = 'Добавить в список';
    const modalContent = `
        <textarea id="modal-textarea" class="modal-textarea" rows="10"></textarea>
        <div class="modal-add-btn" onclick="handleCreateClick()">Добавить</div>
    `;

    showModal(modalTitle, modalContent);
}

function generateItemId() {
    const ids = itemList.map(item => item.id);

    for (let i = 0; ; i++) {
        if (!ids.includes(i)) {
            return i;
        }
    }
}

function renderItemList() {
    const listElem = document.getElementById('list');
    if (!listElem) return;

    listElem.innerHTML = '';

    if (!itemList.length) {
        renderEmpty();
    }
    for (const item of itemList) {
        renderItem(item.id, item.value, item.checked);
    }
}

function renderEmpty() {
    const listElem = document.getElementById(ITEM_LIST_ID);
    if (!listElem) return;

    const emptyTemplate = `
        <div class="empty">
            <div class="empty-text">Пустовато (</div>
        </div>
    `;

    listElem.innerHTML = emptyTemplate;
}

function addItemToList(value) {
    const newItem = {
        id: generateItemId(),
        value,
        checked: false
    }
    
    itemList = [...itemList, newItem];
}

function handleCreateClick() {
    const textarea = document.getElementById(MODAL_TEXTAREA_ID);
    if (!textarea) return;

    const values = textarea.value.split("\n");
    for (const value of values) {
        if (value) {
            addItemToList(value);
        }
    }

    renderItemList();

    hideModal();
    clearModalContent();

    saveItemList();
}

function clearModalContent() {
    const textarea = document.getElementById(MODAL_TEXTAREA_ID);
    if (!textarea) return;

    textarea.value = '';
}

function renderItem(id, text, checked) {
    const listElem = document.getElementById(ITEM_LIST_ID);
    if (!listElem) return;

    const itemTemplate = `
        <div id="item_${id}" class="item${checked ? ' selected' : ''}" onclick="handleItemClick(${id})">
            <input type="checkbox" class="ui-checkbox">
            <div class="item-text">${text || ''}</div>
        </div>
    `;

    listElem.innerHTML += itemTemplate;
}