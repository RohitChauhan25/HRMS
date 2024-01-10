import { PropsWithChildren, ReactNode } from 'react'
import Sidebar from 'components/Sidebar'
import Navbar from 'views/Navbar'
import { Container, MainWrap, SideWrap, Wrapper } from 'styles/components/Layouts'

const JobLayout = ({ children }: PropsWithChildren<{ children: ReactNode }>) => (
  <Container>
    <Wrapper>
      <Navbar />
      <MainWrap>
        <SideWrap>
          <Sidebar />
        </SideWrap>
        {children}
      </MainWrap>
    </Wrapper>
  </Container>
)

export default JobLayout
