import { storage } from '../core/utils';

function itemTemplate(key) {
	const model = storage(key);
	const id = key.split(':')[1];
	return `
                  <div class="item">
                  <div class="title cell"><a href="#/${id}">${model.fileName}</a></div>
                    <div class="date cell">
						${new Date(model.lastChangeDate).toLocaleDateString()}
						${new Date(model.lastChangeDate).toLocaleTimeString()}
					</div>
                </div>`;
}

function getAllKeys() {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key.includes('excel')) {
			keys.push(key);
		}
	}
	return keys;
}

export function createDashboardHistoryTable() {
	const keys = getAllKeys();
	if (!keys) {
		return 'There are no saved tables';
	}
	return `
              <div class="home-screen-history-header">
                <div class="title cell">Title</div>
                <div class="date cell">Date</div>
            </div>
            <div class="home-screen-history-data">
                ${keys.map(itemTemplate).join('')}
             </div>
`;
}
