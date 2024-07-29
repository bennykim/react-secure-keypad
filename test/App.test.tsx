import '@testing-library/jest-dom';
import { MemoryRouter, render, screen, userEvent, vi, waitFor } from './utils';

import * as remote from '../src/api';
import App from '../src/App';
import { getUserId } from '../src/lib/utils';

const setup = (apps: () => void) => {
  beforeEach(apps);
  beforeAll(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
};

const renderApp =
  ({ path }: { path: string }) =>
  () => {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  };

describe('App Test', () => {
  setup(renderApp({ path: '/' }));

  test('메인 페이지에 텍스트 렌더링을 확인 한다.', async () => {
    await screen.findByRole('heading-1');

    expect(screen.getByRole('heading-1')).toHaveTextContent(/Secure Keypad/);
  });

  test('Go Password 버튼을 클릭하면 /password 페이지로 이동한다.', async () => {
    userEvent.click(
      await screen.findByText<HTMLAnchorElement>(/Go to enter your password/)
    );

    await waitFor(() => {
      expect(screen.getByRole('heading-1')).toHaveTextContent(/보안 키패드/);
    });
  });
});

describe('Password Page', () => {
  setup(renderApp({ path: '/password' }));

  test('입력창에 포커스 하면 키패드 모달이 열린다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    expect(await screen.findByText(/삭제/)).toBeInTheDocument();
    expect(await screen.findByText(/확인/)).toBeInTheDocument();
  });

  test('"확인" 버튼을 누르면 키패드가 닫힌다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByRole('button', { name: /확인/ }));

    expect(screen.queryByText(/확인/)).not.toBeInTheDocument();
  });

  test('키패드를 누르면 값이 입력 된다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(2));
    await userEvent.click(await screen.findByTestId(3));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(3);

    await userEvent.click(await screen.findByTestId(7));
    await userEvent.click(await screen.findByTestId(8));
    await userEvent.click(await screen.findByTestId(9));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(6);
  });

  test('키패드 6자리까지 입력할 수 있다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(2));
    await userEvent.click(await screen.findByTestId(3));
    await userEvent.click(await screen.findByTestId(7));
    await userEvent.click(await screen.findByTestId(8));
    await userEvent.click(await screen.findByTestId(9));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(6);

    await userEvent.click(await screen.findByTestId(4));
    await userEvent.click(await screen.findByTestId(5));
    await userEvent.click(await screen.findByTestId(6));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(6);
  });

  test('입력란에 값을 직접 넣을 수 없다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.type(
      await screen.findByLabelText<HTMLInputElement>(/비밀번호/),
      '1234'
    );

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(0);
  });

  test('삭제 버튼을 누르면 마지막 값이 삭제된다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(2));
    await userEvent.click(await screen.findByTestId(3));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(3);

    await userEvent.click(await screen.findByText<HTMLButtonElement>(/삭제/));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(/비밀번호/)).value
    ).toHaveLength(2);
  });

  test('새로고침 버튼을 클릭하면 키보드 데이터를 다시 받아온다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    const spyOnCreate = vi.spyOn(remote, 'createKeypad');
    await userEvent.click(await screen.findByTestId('refresh'));

    expect(spyOnCreate).toHaveBeenCalledWith({ id: getUserId() });
  });

  test('6자리 비밀번호를 입력하면 전송 버튼이 활성화 된다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(2));
    await userEvent.click(await screen.findByTestId(4));
    await userEvent.click(await screen.findByTestId(5));

    expect(await screen.findByRole('button', { name: /전송/ })).toBeDisabled();

    await userEvent.click(await screen.findByTestId(7));
    await userEvent.click(await screen.findByTestId(9));

    expect(await screen.findByRole('button', { name: /전송/ })).toBeEnabled();
  });

  test('6자리 모두 동일 번호를 전송하면 에러 메시지가 출력된다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(1));

    await userEvent.click(await screen.findByRole('button', { name: /전송/ }));

    await waitFor(() => {
      expect(
        screen.queryByText('모든 숫자가 동일한 비밀번호는 허용하지 않습니다.')
      ).toBeInTheDocument();
    });
  });

  test('비밀번호를 정상적으로 전송하면 성공 메시지가 출력된다.', async () => {
    userEvent.click(await screen.findByLabelText<HTMLInputElement>(/비밀번호/));

    await userEvent.click(await screen.findByTestId(1));
    await userEvent.click(await screen.findByTestId(3));
    await userEvent.click(await screen.findByTestId(9));
    await userEvent.click(await screen.findByTestId(5));
    await userEvent.click(await screen.findByTestId(2));
    await userEvent.click(await screen.findByTestId(7));

    await userEvent.click(await screen.findByRole('button', { name: /전송/ }));

    await waitFor(() => {
      expect(
        screen.queryByText('비밀번호가 성공적으로 전송되었습니다.')
      ).toBeInTheDocument();
    });
  });
});
