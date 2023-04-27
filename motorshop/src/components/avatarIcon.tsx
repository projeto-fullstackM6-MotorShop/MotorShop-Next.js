import { Avatar } from "@chakra-ui/react";

interface IAvatar {
  size?: string;
  name: string;
}

const AvatarIcon = (props: IAvatar) => {
  userName?: string;
}

const AvatarIcon = (props: IAvatar) => {
  const userName = props.userName;

  let numberColor = Math.floor(Math.random() * 13);

  if (numberColor == 0) {
    numberColor = 2;
  }

  return (
    <Avatar
      name={props.name}
      bg={`random.${numberColor}`}
      color={"grey.11"}
      size={props.size || "sm"}
      fontWeight={"bold"}
    />
  );
};

export default AvatarIcon;
