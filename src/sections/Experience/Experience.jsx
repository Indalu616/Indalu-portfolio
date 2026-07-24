import experience from '../../data/experience.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import Timeline from '../../components/timeline/Timeline'
import TimelineItem from '../../components/timeline/TimelineItem'
import ExperienceCard from '../../components/cards/ExperienceCard'

export default function Experience() {
  return (
    <SectionWrapper id="experience" ariaLabel="Work experience">
      <SectionTitle
        eyebrow="Experience"
        title="Where I've made an impact"
        description="Six years of shipping production systems, from early-stage startups to AI infrastructure teams."
      />

      <div className="mt-14">
        <Timeline>
          {experience.map((exp) => (
            <TimelineItem key={exp.id} current={exp.current}>
              <ExperienceCard experience={exp} />
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </SectionWrapper>
  )
}
