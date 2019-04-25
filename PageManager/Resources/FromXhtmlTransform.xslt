<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:h="http://www.w3.org/1999/xhtml" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes" standalone="no" cdata-section-elements="script" doctype-public="HTML" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" encoding="utf-8" omit-xml-declaration="yes"/>
  <xsl:template match="/">
    <!--<xsl:text disable-output-escaping="yes"><![CDATA[<!DOCTYPE html>
]]></xsl:text>-->
    <xsl:apply-templates select="* | comment()" />
  </xsl:template>
  <!--<xsl:template match="h:script|script">
    <xsl:element name="script">
      <xsl:apply-templates select="@*"/>
      <xsl:choose>
        <xsl:when test="string-length(normalize-space(.))=0">
          <xsl:text></xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text disable-output-escaping="yes" xml:space="preserve"><![CDATA[<![CDATA[
]]></xsl:text>
          <xsl:value-of disable-output-escaping="yes" select="." xml:space="preserve"/>
          <xsl:text xml:space="preserve"><![CDATA[
]]]]></xsl:text>
          <xsl:text disable-output-escaping="yes">&gt;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:element>
  </xsl:template>-->
  <xsl:template match="h:*">
    <xsl:element name="{local-name()}">
      <xsl:apply-templates select="@* | node()"/>
    </xsl:element>
  </xsl:template>
  <xsl:template match="*">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="@*">
    <xsl:copy />
  </xsl:template>
</xsl:stylesheet>
