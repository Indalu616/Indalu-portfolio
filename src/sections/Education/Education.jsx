import education from '../../data/education.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import Timeline from '../../components/timeline/Timeline'
import TimelineItem from '../../components/timeline/TimelineItem'
import EducationCard from '../../components/cards/EducationCard'

export default function Education() {
  return (
    <SectionWrapper id="education" ariaLabel="Education" className="bg-surface/30">
      <SectionTitle eyebrow="Education" title="Academic foundation" description="Formal training that underpins the engineering and research work." />

      <div className="mt-14">
        <Timeline>
          {education.map((edu) => (
            <TimelineItem key={edu.id}>
              <EducationCard education={edu} />
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </SectionWrapper>
  )
}
