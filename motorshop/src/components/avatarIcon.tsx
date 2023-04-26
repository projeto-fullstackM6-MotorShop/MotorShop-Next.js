import { Avatar } from "@chakra-ui/react";

interface IAvatar {
  size?: string;
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
      name={userName}
      bg={`random.${numberColor}`}
      color={"grey.11"}
      size={props.size || "sm"}
      fontWeight={"bold"}
    />
  );
};

export default AvatarIcon;
