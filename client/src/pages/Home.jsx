import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';
import Projects from '../components/Projects';
import Clients from '../components/Clients';
import Tasks from '../components/Tasks';

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <Tasks />
      <hr />
      <Clients />
    </>
  )
}
