import { Avatar } from "@chakra-ui/react";

const AvatarIcon = () => {
  const userName = "Clayson Roberto";

  const numberColor = Math.floor(Math.random() * 13);

  return (
    <Avatar
      name={userName}
      bg={`random.${numberColor}`}
      color={"grey.11"}
      size={"sm"}
      fontWeight={"bold"}
    />
  );
};

export default AvatarIcon;
