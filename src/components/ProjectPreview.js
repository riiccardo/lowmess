import React from 'react'
import system from 'system-components'
import { textHover } from '../utils/styles'
import { Box, Text } from './Primitives'
import { Paragraph } from './Typography'
import ArrowLink from './ArrowLink'

const ProjectTitle = system(
  {
    is: Text,
    display: 'inline-block',
    my: 0,
    fontSize: [2, 3],
    fontWeight: 7,
    lineHeight: 'title',
  },
  textHover
)

const ProjectPreview = ({ project, level, ...props }) => {
  const WebsiteComponent = project.website ? (
    <ArrowLink dest={project.website} external={true}>
      Website
    </ArrowLink>
  ) : (
    ''
  )

  const RepoComponent = project.repo ? (
    <ArrowLink dest={project.repo} external={true}>
      Repository
    </ArrowLink>
  ) : (
    ''
  )

  return (
    <Box {...props}>
      <a href={project.website ? project.website : project.repo}>
        <ProjectTitle is={level}>{project.title}</ProjectTitle>
      </a>

      <Paragraph fontSize={[1, 2]} lineHeight="copy" mt={3} mb={2}>
        {project.description}
      </Paragraph>

      <Box
        {...(WebsiteComponent && RepoComponent ? { mr: 4 } : {})}
        display="inline-block"
      >
        {WebsiteComponent}
      </Box>

      <Box display="inline-block">{RepoComponent}</Box>
    </Box>
  )
}

export default ProjectPreview