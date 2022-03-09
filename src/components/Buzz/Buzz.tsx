import styled from "styled-components";
import { ListItem, ListUl } from "../../styles/globalStyledComponents";
import { grey, primary } from "../../styles/globalStyles";

interface BuzzProps {
  buzz: BuzzObject;
}
interface BuzzObject {
  category: string;
  likes: number;
  comments: number[];
  author: string;
  text: string;
  date: string;
  id: string;
}

const TextAuthor = styled.p`
  color: ${primary};
  font-weight: 900;
  font-size: 14px;
  text-shadow: 0 3px 3px ${grey};
`;

const TextBuzz = styled.p`
  color: ${primary};
  font-size: 14px;
`;

const TextCategory = styled.p`
  color: ${primary};
  font-weight: 900;
  font-size: 12px;
`;

const Buzz = ({ buzz }: BuzzProps): JSX.Element => {
  return (
    <>
      <TextAuthor>{buzz.author}</TextAuthor>
      <TextBuzz>{buzz.text}</TextBuzz>
      <TextCategory>#{buzz.category}</TextCategory>
      <div>
        <ListUl>
          <ListItem>1h</ListItem>
          <ListItem>icono comment</ListItem>
          <ListItem>heart</ListItem>
        </ListUl>
      </div>
    </>
  );
};

export default Buzz;
