import { Container } from '@/components/Container';
import { NavigationButton } from '@/components/Navigation';
import { TypographyH1 } from '@/components/ui/typography';
import { PATH } from '@/constants';

const Main: React.FC = () => {
  return (
    <Container>
      <TypographyH1 text="Secure Keypad" />
      <NavigationButton text="Go to enter your password" path={PATH.PASSWORD} />
    </Container>
  );
};

export default Main;
