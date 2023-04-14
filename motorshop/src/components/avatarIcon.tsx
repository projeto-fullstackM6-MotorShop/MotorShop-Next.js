import { Avatar } from "@chakra-ui/react";

interface IAvatar{
  size?:string
}

const AvatarIcon = (props: IAvatar) => {
  const userName = "Clayson Roberto";

  const numberColor = Math.floor(Math.random() * 13);

  return (
    <Avatar
      name={userName}
      bg={`random.${numberColor}`}
      color={"grey.11"}
      size={props.size || 'sm'}
      fontWeight={"bold"}
    />
  );
};

export default AvatarIcon;
