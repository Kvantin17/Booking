import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";

import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <Container>
          <HeadingGroup>
            <Heading type="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
            <ButtonText onClick={moveBack} style={{ marginLeft: "auto" }}>
              &larr; Back
            </ButtonText>
          </HeadingGroup>

          <BookingDataBox booking={booking} />

          <ButtonGroup>
            {status === "unconfirmed" && (
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Button>
            )}
          </ButtonGroup>
        </Container>
      </Row>
    </>
  );
}

export default BookingDetail;