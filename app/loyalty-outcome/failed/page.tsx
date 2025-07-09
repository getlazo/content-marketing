import LoyaltyResultScreen from '../../components/LoyaltyResultScreen';

export default function LoyaltyTestFailed() {
  return (
    <LoyaltyResultScreen
      result="failed"
      targetImg="/targetEduardo.jpg"
      checkerImg="/checkerTrinity.png"
      message="Trinity made him fold in:"
    />
  );
} 