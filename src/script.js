const MODAL_ID = 'modal';
const MODAL_TEXTAREA_ID = 'modal-textarea';
const ITEM_LIST_ID = 'list';
const EDIT_MODE_SWITCH_BUTTON_ID = 'editModeSwitchBtn';

const modal = document.getElementById(MODAL_ID);
const editModeSwitchBtn = document.getElementById(EDIT_MODE_SWITCH_BUTTON_ID);
let itemList = [];

let isEditModeEnabled = false;

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

function handleEditModeSwitchClick() {
    if (!editModeSwitchBtn) return;

    const isEnabled = !isEditModeEnabled;

    isEditModeEnabled = isEnabled;

    const items = document.getElementsByClassName('item');
    for (const item of items) {
        if (isEnabled) {
            item.classList.add('edit-mode');
        } else {
            item.classList.remove('edit-mode');
        }
    }
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

const handleDeleteItemClick = (id) => {
    const elem = document.getElementById(`item_${id}`);
    if (!elem) return;

    itemList = itemList.filter(item => item.id !== id);

    renderItemList();
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
        <div id="item_${id}" class="item${checked ? ' selected' : ''}${isEditModeEnabled ? ' edit-mode' : ''}" onclick="handleItemClick(${id})">
            <div class="item-info">
                <input type="checkbox" class="ui-checkbox">
                <div class="item-text">${text || ''}</div>
            </div>
            <div class="item-buttons">
                <div class="item-btn" onclick="handleDeleteItemClick(${id})">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/>
                    </svg>
                </div>
            </div>
        </div>
    `;

    listElem.innerHTML += itemTemplate;
}