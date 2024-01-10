import Accordion from 'components/Accordion'
import { TypeLabel, AccordionContainer } from 'styles/views/Jobs/JobApplication/ScreeningQuestions'

const ScreeningQuestionsContainer = () => (
  <>
    <TypeLabel>Type of Questions</TypeLabel>
    <AccordionContainer>
      <Accordion />
    </AccordionContainer>
  </>
)
export default ScreeningQuestionsContainer
