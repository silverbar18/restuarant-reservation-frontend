
import TimeSelection from "./TimeSelection";
import {Container, Row, Col} from 'react-bootstrap'
import DateSelection from "./DateSelection";
import axios from "axios"
function AvailableTables(){
    axios
      .get("http://localhost:8000/getAvailableTables")
      .then(res => console.log(res)) // re-direct to login on successful register
      .catch(err =>
        console.log(err)
      );
    return (
        <div>d</div>
    )
}


function HomePage() {
  return (
    <Container>
        <Row>
            <Col>
            <DateSelection/>
            </Col>
            <Col>
            <TimeSelection/>
            </Col>
        </Row>
        <Row>
            <Col>
                <AvailableTables/>
            </Col>
        </Row>

  </Container>
  );
}

export default HomePage;
