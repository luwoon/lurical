import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button>Default</Button>
      <Button variant="green">Primary</Button>
      <Button variant="greenOutline">Primary Outline</Button>
      <Button variant="khaki">Secondary</Button>
      <Button variant="khakiOutline">Secondary Outline</Button>
      <Button variant="blue">Danger</Button>
      <Button variant="blueOutline">Danger Outline</Button>
      <Button variant="yellow">Super</Button>
      <Button variant="yellowOutline">Super Outline</Button>
      <Button variant="orange">Ghost</Button>
      <Button variant="orangeOutline">Super Outline</Button>
      <Button variant="red">Sidebar</Button>
      <Button variant="redOutline">Sidebar Outline</Button>
    </div>
  );
};

export default ButtonsPage;