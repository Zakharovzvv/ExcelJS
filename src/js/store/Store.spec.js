import Store from './Store';

const initialState = {
	count: 0,
};
const reducer = (state = initialState, action) => {
	if (action.type === 'ADD') {
		return { ...state, count: state.count + 1 };
	}
	return state;
};

describe('Store', () => {
	let store;
	let handler;

	beforeEach(() => {
		store = new Store(reducer, initialState);
		handler = jest.fn();
	});

	test('should return store object', () => {
		expect(store).toBeDefined();
		expect(store.dispatch).toBeDefined();
		expect(store.subscribe).toBeDefined();
		expect(store.getState).not.toBeUndefined();
	});

	test('should return object as sate', () => {
		expect(store.getState()).toBeInstanceOf(Object);
	});
	test('should return default state', () => {
		expect(store.getState()).toEqual(initialState);
	});
	test('should change state if action exist', () => {
		store.dispatch({ type: 'ADD' });
		const state = store.getState();
		expect(state.count).toBe(1);
	});
	test('should do not change state if do not change action exist', () => {
		store.dispatch({ type: 'NOT EXISTING ACTION' });
		const state = store.getState();
		expect(state.count).toBe(0);
	});
	test('should call subscriber function', () => {
		store.subscribe(handler);
		store.dispatch({ type: 'ADD' });
		expect(handler).toHaveBeenCalled();
		expect(handler).toHaveBeenCalledWith(store.getState());
	});
	test('should do not call sub if unsubscribe', () => {
		const sub = store.subscribe(handler);
		sub.unsubscribe();
		store.dispatch({ type: 'ADD' });
		expect(handler).not.toHaveBeenCalled();
	});
	test('should dispatch in async way', () => new Promise((resolve) => {
		setTimeout(() => {
			store.dispatch({ type: 'ADD' });
		}, 500);
		setTimeout(() => {
			expect(store.getState().count).toBe(1);
			resolve();
		}, 1000);
	}));
});
