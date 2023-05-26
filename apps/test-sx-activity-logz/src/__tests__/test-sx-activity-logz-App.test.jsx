import { waitFor } from '@testing-library/react';
import { renderWithRouter } from '@steelxorg/shared';
import App from '../App';

describe('renders without crashing', () => {
  it('renders homepage', async () => {
    const { getByRole, getAllByText } = renderWithRouter(<App />, {
      route: '/test-sx-activity-logz'
    });

    await waitFor(() => [getByRole('main')]);

    expect(getAllByText(/dashboard/i)).not.toBeNull();
  });
});
