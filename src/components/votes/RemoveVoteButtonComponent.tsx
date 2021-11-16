import {useRouter} from 'next/dist/client/router';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type {Vote} from 'src/classes/Vote';
import {votesPath} from 'src/utils/pageHelpers';

export const RemoveVoteButtonComponent = ({vote}: {vote: Vote}) => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          handleShow();
        }}
        css={{color: 'red'}}
      >
        削除
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>本当に削除しますか？</Modal.Title>
        </Modal.Header>

        <Modal.Body>この操作は取り消すことができません！</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            やめる
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await vote.remove();
              await router.push(votesPath);
            }}
          >
            削除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
