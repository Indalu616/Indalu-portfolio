import { Mail, Globe } from 'lucide-react'
import {
  Code2, BrainCircuit, Cpu, LayoutPanelLeft, Server, Smartphone,
  Cloud, Container, Database, Wrench, BarChart3,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon, DribbbleIcon } from '../components/ui/BrandIcons'

/** Maps social platform keys from social.json to icon components (brand marks are custom SVGs; lucide-react v1 dropped them). */
export const SOCIAL_ICON_MAP = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  mail: Mail,
  dribbble: DribbbleIcon,
  default: Globe,
}

/** Maps skill category icon keys from skills.json to lucide-react icon components. */
export const SKILL_ICON_MAP = {
  'code-2': Code2,
  'brain-circuit': BrainCircuit,
  cpu: Cpu,
  'layout-panel-left': LayoutPanelLeft,
  server: Server,
  smartphone: Smartphone,
  cloud: Cloud,
  container: Container,
  database: Database,
  wrench: Wrench,
  'bar-chart-3': BarChart3,
}
