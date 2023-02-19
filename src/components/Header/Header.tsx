import { PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { FC } from "react";
import { Icon28DoorArrowLeftOutline } from "@vkontakte/icons";
import styles from "components/Header/Header.module.css";

interface HeaderProps {
  user: string;
  handleLogout: () => void;
}

export const Header: FC<HeaderProps> = ({ user, handleLogout }) => {
  return (
    <PanelHeader
      before={
        <PanelHeaderButton aria-label="logout-button" onClick={handleLogout}>
          <Icon28DoorArrowLeftOutline />
        </PanelHeaderButton>
      }
    >
      <div className={styles.textContainer}>
        <h4>{`${user}'s TODOs`}</h4>
      </div>
    </PanelHeader>
  );
};
