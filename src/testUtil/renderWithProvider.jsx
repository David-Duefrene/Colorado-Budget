import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';

import store from '../store';

const renderWithProvider = (element) => render(<Provider store={store}>{element}</Provider>);

export default renderWithProvider;
