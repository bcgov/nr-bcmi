import type { Attribute, Schema } from '@strapi/strapi';

export interface ComponentsFooterLink extends Schema.Component {
  collectionName: 'components_components_footer_links';
  info: {
    displayName: 'FooterLink';
  };
  attributes: {
    Link_name: Attribute.String;
    Page: Attribute.Relation<
      'components.footer-link',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface ComponentsInternalLink extends Schema.Component {
  collectionName: 'components_components_internal_links';
  info: {
    description: '';
    displayName: 'internalLink';
  };
  attributes: {
    Description: Attribute.Text;
    Link: Attribute.Relation<
      'components.internal-link',
      'oneToOne',
      'api::page.page'
    >;
    Link_heading: Attribute.String;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'externalLink';
  };
  attributes: {
    url: Attribute.String;
    Url_name: Attribute.String;
  };
}

export interface ComponentsSocialLink extends Schema.Component {
  collectionName: 'components_components_social_links';
  info: {
    displayName: 'SocialLink';
  };
  attributes: {
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    Url: Attribute.String;
  };
}

export interface LayoutFooterBar extends Schema.Component {
  collectionName: 'components_layout_footer_bars';
  info: {
    description: '';
    displayName: 'footer_bar';
  };
  attributes: {
    External_link: Attribute.Component<'components.link', true>;
  };
}

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'NavLinks';
  };
  attributes: {
    Footer_link: Attribute.Component<'components.footer-link', true>;
    Nav_heading: Attribute.String;
  };
}

export interface PageFeatureBlock extends Schema.Component {
  collectionName: 'components_page_feature_blocks';
  info: {
    description: '';
    displayName: 'Feature Block';
    icon: 'grid';
  };
  attributes: {
    Description: Attribute.String;
    page: Attribute.Relation<
      'page.feature-block',
      'oneToOne',
      'api::page.page'
    >;
    Title: Attribute.String;
  };
}

export interface PageScrollButton extends Schema.Component {
  collectionName: 'components_page_scroll_buttons';
  info: {
    description: '';
    displayName: 'Scroll Button';
  };
  attributes: {
    Section_id: Attribute.String;
    Text: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.footer-link': ComponentsFooterLink;
      'components.internal-link': ComponentsInternalLink;
      'components.link': ComponentsLink;
      'components.social-link': ComponentsSocialLink;
      'layout.footer-bar': LayoutFooterBar;
      'layout.header': LayoutHeader;
      'page.feature-block': PageFeatureBlock;
      'page.scroll-button': PageScrollButton;
    }
  }
}
