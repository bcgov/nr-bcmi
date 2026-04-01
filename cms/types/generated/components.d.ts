import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_components_footer_links';
  info: {
    displayName: 'FooterLink';
  };
  attributes: {
    Link_name: Schema.Attribute.String;
    Page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
  };
}

export interface ComponentsInternalLink extends Struct.ComponentSchema {
  collectionName: 'components_components_internal_links';
  info: {
    description: '';
    displayName: 'internalLink';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Link: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    Link_heading: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'externalLink';
  };
  attributes: {
    url: Schema.Attribute.String;
    Url_name: Schema.Attribute.String;
  };
}

export interface ComponentsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_components_social_links';
  info: {
    displayName: 'SocialLink';
  };
  attributes: {
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Url: Schema.Attribute.String;
  };
}

export interface LayoutFooterBar extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_bars';
  info: {
    description: '';
    displayName: 'footer_bar';
  };
  attributes: {
    External_link: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'NavLinks';
  };
  attributes: {
    Footer_link: Schema.Attribute.Component<'components.footer-link', true>;
    Nav_heading: Schema.Attribute.String;
  };
}

export interface PageFeatureBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_feature_blocks';
  info: {
    description: '';
    displayName: 'Feature Block';
    icon: 'grid';
  };
  attributes: {
    Description: Schema.Attribute.String;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    Title: Schema.Attribute.String;
  };
}

export interface PageScrollButton extends Struct.ComponentSchema {
  collectionName: 'components_page_scroll_buttons';
  info: {
    description: '';
    displayName: 'Scroll Button';
  };
  attributes: {
    Section_id: Schema.Attribute.String;
    Text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
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
