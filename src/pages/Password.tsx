import { Fragment } from 'react/jsx-runtime';

import { authPassword, sendPassword } from '@/api';
import { Container } from '@/components/Container';
import { Form } from '@/components/Form';
import * as Modal from '@/components/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { MAX_PASSWORD_LENGTH, PASSWORD } from '@/constants';
import { useKeypad } from '@/hook/useKeypad';
import { usePasswordForm } from '@/hook/usePasswordForm';
import { getUserId } from '@/lib/utils';

const Password: React.FC = () => {
  const { toast } = useToast();
  const { form, progress, coords, setCoords, clearForm } = usePasswordForm();
  const { toggle, uid, keypad, getKeypad, onOpen, onClose } = useKeypad();

  const handleSubmit = async (action: 'send' | 'auth') => {
    try {
      const id = getUserId();
      const response =
        action === 'send'
          ? await sendPassword({ id, uid, coords })
          : await authPassword({ id, uid, coords });

      toast({
        title:
          action === 'send'
            ? '비밀번호가 성공적으로 전송되었습니다.'
            : response,
        variant: action === 'send' ? undefined : 'success',
      });

      clearForm();
    } catch (error: any) {
      const title = error?.response?.data || 'Error';
      toast({ variant: 'destructive', title });
      clearForm();
    }
  };

  const handleRefresh = () => {
    getKeypad();
    clearForm();
  };

  const handleRemove = () => {
    const currentPassword = form.getValues(PASSWORD);
    const newPassword = currentPassword.slice(0, -1);
    form.setValue(PASSWORD, newPassword);
    setCoords(coords.slice(0, -1));
  };

  const handleClick = (coord: Coord) => () => {
    const currentPassword = form.getValues(PASSWORD);
    if (currentPassword.length < MAX_PASSWORD_LENGTH) {
      const updatedPassword = currentPassword + '*';
      form.setValue(PASSWORD, updatedPassword);
      form.clearErrors(PASSWORD);
      setCoords([...coords, coord]);
    }
  };

  return (
    <Fragment>
      <Container>
        <Tabs defaultValue="password" className="w-[400px] mt-8">
          <TabsList className="mb-10">
            <TabsTrigger value="password">비밀번호 등록</TabsTrigger>
            <TabsTrigger value="passwordConfirm">비밀번호 인증</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <Form<PasswordFields>
              form={form}
              type={PASSWORD}
              max={MAX_PASSWORD_LENGTH}
              label="비밀번호"
              placeholder="새 비밀번호 입력"
              messages={{
                required: '비밀번호는 필수 입력 항목입니다.',
                minLength: '비밀번호는 6자까지 입력해 주세요.',
              }}
              onFocus={onOpen}
              onSubmit={() => handleSubmit('send')}
            />
          </TabsContent>
          <TabsContent value="passwordConfirm">
            <Form<PasswordFields>
              form={form}
              type={PASSWORD}
              max={MAX_PASSWORD_LENGTH}
              label="비밀번호"
              placeholder="등록한 비밀번호 입력"
              messages={{
                required: '비밀번호는 필수 입력 항목입니다.',
                minLength: '비밀번호는 6자까지 입력해 주세요.',
              }}
              onFocus={onOpen}
              onSubmit={() => handleSubmit('auth')}
            />
          </TabsContent>
        </Tabs>
      </Container>
      <Modal.Keypad
        open={toggle}
        size={keypad.size}
        svgGrid={keypad.svgGrid}
        progress={progress}
        onClose={onClose}
        onRefresh={handleRefresh}
        onRemove={handleRemove}
        onChange={handleClick}
      />
      <Toaster />
    </Fragment>
  );
};

export default Password;
